import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from "../lib/posts";
import {prefixes} from "next/dist/build/output/log";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
        	allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>I'm Austin Miles, a full stack software developer, pilot, and real estate investor!</p>
          <p>
              This is an example Next.js (React) application which uses a blend of static html pages, server rendered pages, and client-side javascript to create the perfect blend of speed, dynamic user experience, and great search engine optimization.
          </p>
        </section>

          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
              <h2 className={utilStyles.headingLg}>Example Blog Posts</h2>
              <p>This data was parsed from markdown files on the file system. But this data can be populated via an external api or an internal database query!</p>
              <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, title, date }) => (
                      <li className={utilStyles.listItem} key={id}>
                          <Link href={`/posts/${id}`}>
                              <a>{title}</a>
                          </Link>
                          <br />
                          <small className={utilStyles.lightText}>
                              <Date dateString={date} />
                          </small>
                      </li>
                  ))}
              </ul>
          </section>


      </Layout>
  )
}