import '../../styles/styles.sass'
import FilmService from '../../services/FilmService'

function Test () {
    const filmService = new FilmService()
    // let res = '';

    const step1 = async () => {
        let res = await filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
        .then(data => data.request_token);
        console.log(res);
    }
//?redirect_to=http://localhost:3000/test
    const step2 = async () => {
        // let link = `https://www.themoviedb.org/authenticate/${res}`;
        // console.log(link);
    }

    // const step3 = async () => {

    //     let result = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=4aaf41b3f13597064b5ab63a054684c1&request_token=${res}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(data => data.json()).then(data => data.session_id)
    //     console.log(result)
    //     return result;
    // }

    const finalFunc = async () => {
        let res = await filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
        .then(data => data.request_token);
        console.log(res);

        let link = `https://www.themoviedb.org/authenticate/${res}`;
        console.log(link);

        let result = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=4aaf41b3f13597064b5ab63a054684c1&request_token=${res}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then(data => data.session_id)
        console.log(result)
    }

    return (
        <div className="test">
            <div className="container">
                {/* <div onClick={finalFunc} className="button">Step1</div> */}
                {/* <div onClick={step2} className="button">Step2</div>
                <div onClick={step3}className="button">Step3</div> */}
            </div>
        </div>
    )
}

export default Test

//4aaf41b3f13597064b5ab63a054684c1