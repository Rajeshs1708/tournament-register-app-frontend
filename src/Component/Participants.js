import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Participants () {
  const [editMode, setEditMode] = useState(false)
  const [plist, setpList] = useState([])
  const [tlist, settList] = useState([])
  const [tournament_name, setTournament_name] = useState('')
  const [participant_name, setParticipant_name] = useState('')
  const [userId, setUserId] = useState('')

  //Show Tournament List
  const showTournament = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/show/tournament/list`
      )
      settList(data)
    } catch (error) {
      console.log(error)
    }
  }
  //Show Participant List
  const showParticipant = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/show/participant/list`
      )
      setpList(data)
    } catch (error) {
      console.log(error)
    }
  }
  //Add Participant
  const addParticipant = async e => {
    e.preventDefault()
    try {
      const add = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/create/participant/list`,
        { tournament_name, participant_name }
      )
      if (add.status === 200) {
        showParticipant()
        setTournament_name('')
        setParticipant_name('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Delete Participant
  const deleteParticipant = async id => {
    try {
      const deleteTournament = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/delete/participant/${id}`
      )
      showParticipant()
    } catch (error) {
      console.log(error)
    }
  }
  //SHOW SINGLE Participant
  const showSingleParticipant = async id => {
    setEditMode(true)
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/participant/${id}`
      )
      setTournament_name(data.tournament_name)
      setParticipant_name(data.participant_name)
      setUserId(data.id)
    } catch (error) {
      console.log(error)
    }
  }
  //UPDATE SINGLE Participant
  const editParticipant = async e => {
    e.preventDefault()
    try {
      const edit = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/update/participant/${userId}`,
        { tournament_name, participant_name }
      )
      setEditMode(false)
      setTournament_name('')
      setParticipant_name('')
      showParticipant()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showParticipant()
    showTournament()
  }, [])
  return (
    <div className='container'>
      <form onSubmit={editMode ? editParticipant : addParticipant}>
        <div className='row m-3'>
          <div className='col'>
            <input
              onChange={e => setTournament_name(e.target.value)}
              value={tournament_name}
              type='text'
              className='form-control'
              placeholder='Tournament Name'
              aria-label='Tournament Name'
            />
          </div>
          <div className='col'>
            <input
              onChange={e => setParticipant_name(e.target.value)}
              value={participant_name}
              type='text'
              className='form-control'
              placeholder='Participant Name'
              aria-label='Participant Name'
            />
          </div>
        </div>
        <div className='row m-3'>
          <div className='col'>
            <select className='form-select' aria-label='Default select example'>
              <option selected>Check the Available Tournaments</option>
              {tlist &&
                tlist.map(d => (
                  <option value={`${d.id}`}>{d.tournament_name}</option>
                ))}
            </select>
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
                + Register
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
            <th scope='col'>Participant_name</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {plist &&
            plist.map(d => (
              <tr key={d.id}>
                <th scope='row'>{d.id}</th>
                <td>{d.tournament_name}</td>
                <td>{d.participant_name}</td>
                <td>
                  <i
                    onClick={() => showSingleParticipant(d.id)}
                    className='fa-solid fa-pen-to-square'
                    style={{
                      color: 'green',
                      cursor: 'pointer',
                      marginRight: '20px'
                    }}
                  ></i>
                  <i
                    onClick={() => deleteParticipant(d.id)}
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

export default Participants
