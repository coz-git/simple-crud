import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from './assets/logo_pelindo.png'
import axios from 'axios'

const Container = styled.div`
  padding: 1em;
  overflow-x: hidden;
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
`

const Body = styled.div`
  width: ${props => props.onAction ? '75vw' : '100vw'};
  transition: width 1s ease;
`

const AddContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`

const AddButton = styled.button`
  border: none;
  font-size: 15px;
  padding: 10px 35px;
  border-radius: 20px;
  background-color: #006bb2;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;

  &:hover {
    background-color: #fff;
    color: #006bb2;
    border: 1px solid #006bb2;
  }
`

const Table = styled.table`
  border:1px solid black;
  width: 100%;

  th, td {
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #D6EEEE;
  }
`

const ContainerBody = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80vh;
`

const Form = styled.div`
  width: 25vw;
  padding: 0px 20px;
  transition:opacity 3s linear;
  display: ${props => props.onAction ? 'block' : 'none'};
`

const SubmitButton = styled.button`
  border: none;
  font-size: 15px;
  width: 100%;
  padding: 10px 35px;
  border-radius: 20px;
  background-color: #006bb2;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;

  &:hover {
    background-color: #fff;
    color: #006bb2;
    border: 1px solid #006bb2;
  }
`

const FormInput = styled.div`
  margin : '10px 0px';

  div {
    padding : '10px 0px';
  }
`

const ButtonAction = styled.span`
  cursor: pointer;
  margin : 0px 5px;
`

const Page = () => {
  const [userData, setUserData] = useState([])
  const [onAction, setOnAction] = useState(false)
  const [selectedId, setSelectedId] = useState('all')
  const [formData, setFormData] = useState({
    userid : 0,
    namalengkap : '',
    username : '',
    password : '',
    status : 'active'
  })

  useEffect(() => {
    getData()
  }, [selectedId])
  
  const getData = () => {
    axios.get(`http://localhost:5094/api/user/getDataUser/${selectedId}`)
    .then(function (response) {
      setUserData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleChangeStatus = (value) => {
    setFormData({ ...formData, status : value })
  }

  const handleAdd = () => {
    setOnAction(true)
    setFormData({
      userid : 0,
      namalengkap : '',
      username : '',
      password : '',
      status : 'active'
    })
  }

  const handleUpdate = (data) => {
    setOnAction(true)
    setFormData(data)
  }

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:5094/api/user/setDataUser',
      data: formData
    })
    .then(function (response) {
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleDelete = (id) => {
    axios({
      method: 'delete',
      url: `http://localhost:5094/api/user/delDataUser/${id}`,
    })
    .then(function (response) {
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <Container>
        <Nav>
          <img src={logo} alt="" />
          <div>
            <p>MOCK-UP APPLICATION (CRUD) TEST</p>
          </div>
        </Nav>
        <hr/>
        <ContainerBody>
          <Body onAction={onAction}>
            <div style={{ display :'flex', justifyContent : 'space-between', alignItems : 'center' }}>
              <div>
                <label htmlFor="selectedId">Filter By ID</label>
                <select 
                  id="selectedId" 
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value) } 
                  name="selectedId" 
                  style={{marginLeft : '20px', width : '40vw'}} 
                >
                  <option value="all">Silahkan pilih untuk memfilter data</option>
                  { userData.map((item) => (
                    <option key={item.userid} value={item.userid}>{item.userid} - {item.username}</option>
                  )) }
                </select>
              </div>
              <AddContainer>
                <AddButton onClick={() => handleAdd()} >Add</AddButton>
              </AddContainer>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Lengkap</th>
                  <th>UserName</th>
                  <th>Password</th>
                  <th>Status</th>
                  <th width="50px">Action</th>
                </tr>
              </thead>
              <tbody>
                { userData.map((item, index) => (
                  <tr key={item.userid}>
                    <td>{index + 1}</td>
                    <td>{item.namalengkap}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.status}</td>
                    <td>
                      <ButtonAction onClick={() => handleUpdate(item)}>
                        <i className="fa-solid fa-pen-to-square" style={{ color : '#54ca68' }} ></i>
                      </ButtonAction>
                      <ButtonAction onClick={() => handleDelete(item.userid)}>
                        <i className="fa-solid fa-trash" style={{ color : '#ff653a' }}></i>
                      </ButtonAction>
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Body>
          <Form onAction={onAction}>
            <div style={{display : 'flex', justifyContent : 'space-between', margin: '10px'}}>
              <h3 style={{margin : '0px auto' }}>Form Action</h3>
              <span onClick={() => setOnAction(false)}>
                <i className="fa-solid fa-circle-xmark" style={{ display : 'flex', alignItems : 'center', color :'#13335f', fontSize : '20px', cursor :'pointer' }}></i>
              </span>
            </div>
            <FormInput>
              <div style={{padding : '10px 0px'}}>
                <label htmlFor="namalengkap">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.namalengkap}
                  style={{width : '100%'}} 
                  id="namalengkap" 
                  name="namalengkap" 
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div style={{padding : '10px 0px'}}>
                <label htmlFor="username">UserName</label>
                <input 
                  type="text" 
                  value={formData.username}
                  style={{width : '100%'}} 
                  id="username" 
                  name="username" 
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div style={{padding : '10px 0px'}}>
                <label htmlFor="password">Password</label>
                <input 
                  type="text" 
                  value={formData.password}
                  style={{width : '100%'}} 
                  id="password" 
                  name="password" 
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div style={{padding : '10px 0px'}}>
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  value={formData.status} 
                  onChange={(e) => handleChangeStatus(e.target.value) } 
                  name="status" 
                  style={{width : '100%'}}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </FormInput>
            <SubmitButton onClick={() => handleSubmit()}> Submit</SubmitButton>
          </Form>
        </ContainerBody>
      </Container>
    </>
  )
}

export default Page