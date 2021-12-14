import './AccountEnter.sass'
import '../../styles/styles.sass'
import {useState} from 'react'

function AccountEnter () {
    const [form, setForm] = useState(false);

    const toggleForm = () => {
        setForm(form => !form);
    }

    return (
        <section className="enter">
            <div className="container">
                <h2 className="enter__title">Log in to your account</h2>
                <h3 className="enter__title enter__title-small">Or create an account with us</h3>
                <div className="enter__block">
                    <div className="enter__log">
                        <h4 className="enter__title enter__title-small">Log in!</h4>
                        <form>
                            <input placeholder='Enter your login' name='login' type="text" required/>
                            <input placeholder='Enter your password' name='password' type="text" required/>
                            <button className='button'>Log in</button>
                        </form>
                    </div>
                    <div className="enter__reg" style={form ? {'display' : 'block'} : {'display' : 'none'}}>
                        <h4 className="enter__title enter__title-small">Create an account!</h4>
                        <form>
                            <input placeholder='Enter your name' name='name' type="text" required/>
                            <input placeholder='Enter your login' name='login' type="text" required/>
                            <input placeholder='Enter your age' name='age' type="text" required/>
                            <input placeholder='Enter your password' name='password' type="text" required/>
                            <button className='button'>Log in</button>
                        </form>
                    </div>
                </div>
                <div onClick={toggleForm} style={form ? {'display' : 'none'} : {'display' : 'flex'}} className="button-large">Or create account</div>
            </div>
        </section>
    )
}

export default AccountEnter