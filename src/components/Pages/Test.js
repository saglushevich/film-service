import '../../styles/styles.sass'
import FilmService from '../../services/FilmService'

function Test () {
    const filmService = new FilmService()

    // const step1 = () => {
    //     filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
    //     .then(data => console.log(data.request_token));
    // }

    const step2 = async () => {
        
        let res = await filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
        .then(data => data.request_token)
        .then(data => {
            return {
                'link': `https://www.themoviedb.org/authenticate/${data}?redirect_to=localhost:3000`,
                'key': data
            }
        })
        console.log(res.link);
        return res;
    }

    const step3 = async () => {
        let res = await step2();
        let fetching = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=4aaf41b3f13597064b5ab63a054684c1', {
            method: 'POST',
            body: JSON.stringify(res.key)
        });

        return fetching
    }
//https://api.themoviedb.org/3/authentication/session/new?api_key=4aaf41b3f13597064b5ab63a054684c1
    return (
        <div className="test">
            <div className="container">
                {/* <div onClick={step1} className="button">Step1</div> */}
                <div onClick={step2} className="button">Step2</div>
                <div onClick={step3}className="button">Step3</div>
            </div>
        </div>
    )
}

export default Test

//4aaf41b3f13597064b5ab63a054684c1