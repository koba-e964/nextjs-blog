import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import { ParsedUrlQuery } from "querystring";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = (async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
});

type PostData = any // TODO: define type

type Props = {
  postData: PostData,
}

interface Params extends ParsedUrlQuery {
  id: string,
}

export const getStaticProps: GetStaticProps<Props, Params> = (async (context) => {
  const params  = context.params!;
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
});
