import React from 'react'
import { Helmet } from 'react-helmet-async';

type MetaProps = {
  title: string,
  description?: string,
  keywords?: string,
}

const Meta = (props: MetaProps) => {
  const {
    title = 'Welcome to MERN-shop',
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum soluta architecto aliquam, accusantium beatae excepturi quisquam ipsam magnam. Rem totam obcaecati numquam tenetur cupiditate ipsam, neque aliquam magni error. Quam.',
    keywords = 'electronics, buy electronics, cheap electronics'
  } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

export default Meta