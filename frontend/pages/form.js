import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Form.module.css'
import Router, {useRouter} from 'next/router'

import { api } from '../services/api'

export default function Form() {
    const [modelo, setModelo] = useState('')
    const [marca, setMarca] = useState('')
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')

    const router = useRouter()
    const id = router.query.id
    const idcars = router.query.idcars
    
    
    async function handlesubmit(e) {
        e.preventDefault()
        const data = {modelo, marca, tipo, status}
        
        try {
            if(id == 1){
                await api.post('/createcars', data)
            }else{
                await api.put(`/updatecars/${idcars}`, data)
            }
            Router.push('/')
        } catch (error) {
            
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Desafio Estagio</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <button
                className={styles.buttonback}
                onClick={() => Router.push('/')}
            >
                Voltar
            </button>
            <form className={styles.containerform} onSubmit={handlesubmit}>
                <h1 className={styles.textform}>Modelo</h1>
                <input type='text' value={modelo} className={styles.input}
                    onChange={(e) => setModelo(e.target.value)}
                >

                </input>

                <h1 className={styles.textform}>Marca</h1>
                <input type='text'value={marca} className={styles.input}
                    onChange={(e) => setMarca(e.target.value)}
                >

                </input>

                <h1 className={styles.textform}>Tipo</h1>
                <div className={styles.containerinput}>
                    <input type='radio' name='theradio' value='Hatch'
                        id='hatch' className={styles.inputradio}
                        onClick={(e) => setTipo(e.target.value)}
                    >

                    </input>
                    <label className={styles.textradio}>Hatch</label>

                    <input type='radio' name='theradio' value='Sedan'
                        id='sedan' className={styles.inputradio}
                        onClick={(e) => setTipo(e.target.value)}
                    >

                    </input>
                    <label className={styles.textradio}>Sedan</label>

                    <input type='radio' name='theradio' value='Suv'
                        id='suv' className={styles.inputradio}
                        onClick={(e) => setTipo(e.target.value)}
                    >
                    </input>
                    <label className={styles.textradio}>Suv</label>
                </div>



                <h1 className={styles.textform}>Status</h1>
                <div className={styles.containerinput}>

                    <input type='radio' name='theradio2' value='Alugado' id='rented' 
                        className={styles.inputradio}
                        onClick={(e) => setStatus(e.target.value)}
                    >

                    </input>
                    <label className={styles.textradio}>Alugado </label>

                    <input type='radio' name='theradio2' value='Disponivel' id='available' 
                        className={styles.inputradio}
                        onClick={(e) => setStatus(e.target.value)}
                    >

                    </input>
                    <label className={styles.textradio}>Disponivel </label>
                </div>


                <button className={styles.buttonsubmit}> Confirmar </button>
            </form>
        </div>
    )
}