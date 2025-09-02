import { Link } from "react-router-dom";
import { Article } from "../shared/data-access/api/models/article";
import dayjs from "dayjs";

interface ArticleMetaProps {
  article: Article;
}

export const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const author = article.author;

  const fallback = "/assets/profile-icon.jpg";
  const src = author?.image ?? fallback;

  return (
    <>
      <a href={`/profile/${author.username}`}>
        <img
          src={src}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = fallback;
          }}
        />
      </a>
      <div className="info">
        <Link
          reloadDocument
          to={`/profile/${author.username}`}
          className="author"
        >
          {author.username}
        </Link>
        <span className="date">
          {dayjs(article.createdAt).format("MMMM D, YYYY")}
        </span>
      </div>
    </>
  );
};
