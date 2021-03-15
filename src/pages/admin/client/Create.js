import React,{useState,useForm} from 'react'
import Axios from 'axios'
import { api } from '../../../utils/api'
// import LoadingComponent from '../../../components/loading/Index'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from 'axios'




const Create = () => {
    const history = useHistory()
    // const { register, handleSubmit, errors } = useForm()
    const [isUpdate, setUpdate] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    const [data, setData] = useState({
        name:"",
        email:"",
        dob:"",
        accountNumber:"",
        bankName:"",
        branch:""
    })


    function submit(e){
        e.preventDefault()
        console.log(data)
        axios.post(`${api}admin/client/create`,{
            name:data.name,
            email:data.email,
            dob:data.dob,
            accountNumber:data.accountNumber,
            bankName:data.bankName,
            branch:data.branch
        },header)
            .then(res=>{
                // console.log(res.data)
                // setData()
                setTimeout(() => {
                    history.push('/admin/client')

                }, 1000);
            })
            // .catch()

    }
    

   function handel(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        // console.log(newData)
    }

 

    return (
        <div className="container-fluid py-4">
            <div className="shadow" style={{ marginLeft: 15, marginRight: 15, backgroundColor: '#fff' }}>
                <div className="row" >
                    <div className="col-12 col-lg-8 offset-lg-2 create-col-style" >
                        <h3 className="text-center ">Create Client</h3>
                        <form onSubmit={e=>submit(e)}>
                            <div className="mb-3">
                                <label for="name" className="form-label">Client Name</label>
                                <input type="text" className="form-control" onChange={(e) => handel(e)} value={data.name} id="name" />
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email</label>
                                <input type="text" className="form-control" onChange={(e) => handel(e)} value={data.email} id="email" />
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="mb-3">
                                        <label for="dob" className="form-label">Date of Birth</label>
                                        <input type="date" class="form-control" onChange={(e) => handel(e)} value={data.dob} id="dob" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="mb-3">
                                        <label for="accountNumber" className="form-label">Account Number</label>
                                        <input type="number" onChange={(e) => handel(e)} value={data.accountNumber} id="accountNumber" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div className="mb-3">
                                        <label for="bankName" className="form-label">Bank Name</label>
                                        <input type="text" class="form-control" onChange={(e) => handel(e)} value={data.bankName} id="bankName" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="mb-3">
                                        <label for="Branch" className="form-label">Branch</label>
                                        <input type="text" onChange={(e) => handel(e)} value={data.branch} id="branch"  class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <button type="sumbit" class="btn shadow-none" style={{ backgroundColor: '#ff5733', color: '#fff' }}>Create</button>



                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;