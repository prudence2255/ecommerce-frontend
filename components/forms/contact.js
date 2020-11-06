import * as A from 'components/adminImports';
import {RemoveIcon} from 'components/admin/icons';


const Contact = ({error, customer}) => {
    const [contacts, setContacts] = A.useState([]);
    const dispatch = A.useDispatch();

    const myRef = A.useRef(null);

const handleContact = async() => { 
    const contact = myRef.current.value;
    if(contact === ''){
        return
    }
let contactObj = [...contacts];
    setContacts([...contactObj, contact]);
    dispatch(A.setContacts(contact))
    myRef.current.value = '';
 }

 const handleRemove = (index) => {
     let contactObj = [...contacts]
     contactObj.splice(index, 1)
     setContacts(contactObj)
     dispatch(A.removeContact(index))
 }
 A.useEffect(() => {
     let phones;
if(customer.contact){
   phones =  [...contacts, ...customer.contact];
    setContacts(phones)
   for (let i = 0; i < phones.length; i++) {
    dispatch(A.setContacts(phones[i]))  
   }
}else{
    phones = [...contacts]
    setContacts(phones)
    for (let i = 0; i < phones.length; i++) {
        dispatch(A.setContacts(phones[i]))  
       }
}
     return () => {}
 }, [customer])
    return(
        <>
        <div className="border p-3">
        <div className="row">
            <div className="col">
            <p>Name: <span className="w3-text-blue">{customer.name}</span></p>
            </div>
        </div>
        <div className="row">
            <div className="col">
            <p>Email: <span className="w3-text-blue">{customer.email}</span></p>
            </div>
        </div>
        <div className="row">
           
           {contacts?.map((contact, index) => (
            <div className="col-md-12 my-3 d-flex justify-content-between" key={index}> 
                <span><b>{contact}</b></span>
             <a className="btn ml-5" onClick={() => handleRemove(index)}><RemoveIcon /></a>
                  
            </div>  
            ))}  
            {error &&  <p className="error">{error}</p>}
        </div> 
            <div className="row">
            <div className="col-md-12 my-2 d-flex justify-content-between">
            <input className="form-control" type="text" id="contact-btn" name="contact" ref={myRef} placeholder="Add phone number"/>
            <a className="btn w3-blue" onClick={handleContact}>add</a>
            </div>
            </div> 
        </div>
            
            <style jsx>
                {`
                .form-control{
                    max-width: 200px;
                }
                `}
            </style>
        </>
    )
    
}

export default Contact;