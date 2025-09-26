
import './App.css'
import HeaderAdmin from './Components/HeaderAdmin';
import Sidebar from './Components/Sidebar'
import {Layout } from "antd";
function App() {

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderAdmin />
        <Sidebar/>
      </Layout>
    </>
  )
}

export default App
