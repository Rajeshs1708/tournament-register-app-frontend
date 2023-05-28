import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

function Tournaments () {
  const [editMode, setEditMode] = useState(false)
  const [list, setList] = useState([])
  const [tournament_name, setTournament_name] = useState('')
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const [status_of_tournament, setStatus_of_tournament] = useState('')
  const [userId, setUserId] = useState('')

  //Show Tournament List
  const showTournament = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/show/tournament/list'
      )
      setList(data)
    } catch (error) {
      console.log(error)
    }
  }
  //Add Tournament
  const addTournament = async e => {
    e.preventDefault()
    if (
      tournament_name == '' ||
      start_date == '' ||
      end_date == '' ||
      status_of_tournament == ''
    ) {
      alert("Input Won't Empty")
    }
    try {
      const add = await axios.post(
        'http://localhost:8080/api/create/tournament/list',
        { tournament_name, start_date, end_date, status_of_tournament }
      )
      if (add.status === 200) {
        showTournament()
        setTournament_name('')
        setStart_date('')
        setEnd_date('')
        setStatus_of_tournament('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Delete Tournament
  const deleteTournament = async id => {
    try {
      const deleteTournament = await axios.delete(
        `http://localhost:8080/api/delete/tournament/${id}`
      )
      showTournament()
    } catch (error) {
      console.log(error)
    }
  }
  //SHOW SINGLE Tournament
  const showSingleTournament = async id => {
    setEditMode(true)
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/tournament/${id}`
      )
      setTournament_name(data.tournament_name)
      setStart_date(data.start_date)
      setEnd_date(data.end_date)
      setStatus_of_tournament(data.status_of_tournament)
      setUserId(data.id)
    } catch (error) {
      console.log(error)
    }
  }

  //UPDATE SINGLE Tournament
  const editTournament = async e => {
    e.preventDefault()
    try {
      const edit = await axios.put(
        `http://localhost:8080/api/update/tournament/${userId}`,
        { tournament_name, start_date, end_date, status_of_tournament }
      )
      setEditMode(false)
      setTournament_name('')
      setStart_date('')
      setEnd_date('')
      setStatus_of_tournament('')
      showTournament()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showTournament()
  }, [])
  return (
    <div className='container'>
      <form onSubmit={editMode ? editTournament : addTournament}>
        <div className='row m-3'>
          <div className='col'>
            <input
              onChange={e => setTournament_name(e.target.value)}
              value={tournament_name}
              type='text'
              className='form-control'
              placeholder='Tournament name'
              aria-label='Tournament name'
            />
          </div>
          <div className='col'>
            <input
              onChange={e => setStart_date(e.target.value)}
              value={start_date}
              type='text'
              className='form-control'
              placeholder='Start Date (E.g) 2023-05-01'
              aria-label='Start Date'
            />
          </div>
        </div>
        <div className='row m-3'>
          <div className='col'>
            <input
              onChange={e => setEnd_date(e.target.value)}
              value={end_date}
              type='text'
              className='form-control'
              placeholder='End Date (E.g) 2023-06-01'
              aria-label='End Date'
            />
          </div>
          <div className='col'>
            <input
              onChange={e => setStatus_of_tournament(e.target.value)}
              value={status_of_tournament}
              type='text'
              className='form-control'
              placeholder='Status of tournament'
              aria-label='Status of tournament'
            />
          </div>
        </div>
        <div className='row m-3'>
          <div className='col'>
            {editMode ? (
              <button className='btn btn-primary' style={{ width: '100%' }}>
                + Edit
              </button>
            ) : (
              <button className='btn btn-success' style={{ width: '100%' }}>
                + Create Tournament
              </button>
            )}
          </div>
        </div>
      </form>

      <table className='table table-bordered mt-5'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Tournament_name</th>
            <th scope='col'>Start_date</th>
            <th scope='col'>End_date</th>
            <th scope='col'>status_of_tournament</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map(d => (
              <tr key={d.id}>
                <th scope='row'>{d.id}</th>
                <td>{d.tournament_name}</td>
                <td>{d.start_date}</td>
                <td>{d.end_date}</td>
                <td>{d.status_of_tournament}</td>
                <td>
                  <i
                    onClick={() => showSingleTournament(d.id)}
                    className='fa-solid fa-pen-to-square'
                    style={{
                      color: 'green',
                      cursor: 'pointer',
                      marginRight: '20px'
                    }}
                  ></i>
                  <i
                    onClick={() => deleteTournament(d.id)}
                    className='fa-solid fa-trash'
                    style={{
                      color: 'red',
                      cursor: 'pointer'
                    }}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tournaments
