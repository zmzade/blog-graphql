import React from "react";
import Link from "next/link";

import styles from "../styles/BlogCard.module.css";

const BlogCard = ({
  author,
  content,
  coverPhoto,
  datePublished,
  slug,
  title,
}) => {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} width={100} alt="coverPhoto" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avatar.url} width={100} alt="" />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{datePublished}</h3>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content.html }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
