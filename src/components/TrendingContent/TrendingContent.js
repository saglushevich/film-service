import './TrendingContent.sass';
import '../../styles/styles.sass'

function TrendingContent ({title, content}) {
    return (
        <section className="trending">
            <div className="container">
                <h2 className="trending__subtitle">
                    <div className="trending__divider"></div>
                    {title}
                </h2>
                <ul className="trending__block">
                    {content}
                </ul>
            </div>
        </section>
    )
}

export default TrendingContent