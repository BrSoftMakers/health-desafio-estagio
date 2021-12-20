import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { api } from '../services/api'

export default function Home({ data }) {
  const [deleteon, setDeleteOn] = useState(false)
  const [updateon, setUpdateOn] = useState(false)

  async function deleteCars(id) {
    try {
      await api.delete(`/deletecars/${id}`)
      
    } catch (error) {
      console.log(error)
    }
  }

   function updatecars(id){
    Router.push({pathname: '/form', query: {idform: 2, idcars: id}})
  }

  let styleul = {}

  if(deleteon) styleul = {borderColor: '#FF0000'}
  if(updateon) styleul = {borderColor: '#00BFFF'}

  return (
    <div className={styles.container}>
      <Head>
        <title>Desafio Estagio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.containerbutton}>
        <button
          style={{ backgroundColor: '#00FF00' }}
          className={styles.button}
          onClick={() => Router.push({pathname: '/form', query: {id: 1}})}
        >
          Adicionar
        </button>
        <button
          style={{ backgroundColor: '#FF0000', marginInline: 20 }}
          className={styles.button}
          onClick={() => setDeleteOn(!deleteon)}
        >
          Excluir
        </button>
        <button
          style={{ backgroundColor: '#00BFFF' }}
          className={styles.button}
          onClick={() => setUpdateOn(!updateon)}
        >
          Editar
        </button>
      </div>
      {console.log('dados api', data)}
      <div className={styles.containertexttitle}>
        <h1 className={styles.texttitle}> Modelo </h1>
        <h1 className={styles.texttitle}> Marca </h1>
        <h1 className={styles.texttitle}> Tipo </h1>
        <h1 className={styles.texttitle}> Status </h1>
      </div>

      {data.map(item => (
        <ul
          style={styleul}
          className={styles.list} key={item.id}
          onClick={() => deleteon && deleteCars(item.id) || updateon && updatecars(item.id)}
        >
          <li className={styles.itemlist}>{item.modelo}</li>
          <li className={styles.itemlist}>{item.marca}</li>
          <li className={styles.itemlist}>{item.tipo}</li>
          <li className={styles.itemlist}>{item.status}</li>
        </ul>
      ))}

    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await api.get('/')

    return {
      props: {
        data: response.data
      }
    }
  } catch (error) {
    console.log(error)
    return { data: [] }
  }
}