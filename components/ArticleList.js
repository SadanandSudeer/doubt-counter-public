import ArticleItem from './ArticleItem';
import articleStyles from '../styles/Article.module.css';

const ArticleList = ({articles}) => {
    return(
        <div className={articleStyles.grid}>
            {articles.map((a) => (<ArticleItem key={a.id} article={a} />))}
        </div>
    );
}

export default ArticleList;