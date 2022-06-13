import React from "react";
import styles from "../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1.graphcms.com/v2/cl4birevw30xr01w85ys1hg4e/master"
);

const QUERY = gql`
  query Post($slug: string!) {
    post(where: { slug: $slug }) {
      title
      id
      date_published
      slug
      content {
        html
      }

      author {
        id
        name
        avatar {
          url
        }
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;
export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} className={styles.cover} alt="" />
      <div className={styles.title}>
        <img src={post.author.avatar.url} alt="" />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>{post.datePublished}</h6>
        </div>
      </div>
      <h2>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
}
