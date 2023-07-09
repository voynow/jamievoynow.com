import Image from 'next/image';

const skills = [
  { src: '/images/aws.png', alt: 'AWS' },
  { src: '/images/glue.png', alt: 'AWS Glue' },
  { src: '/images/lambda.png', alt: 'AWS Lambda' },
  { src: '/images/openai.png', alt: 'OpenAI' },
  { src: '/images/pandas.png', alt: 'Pandas' },
  { src: '/images/python.png', alt: 'Python' },
  { src: '/images/s3.png', alt: 'AWS S3' },
  { src: '/images/spark.png', alt: 'PySpark' },
  { src: '/images/stepfunctions.svg', alt: 'AWS Step Functions' }
];

export default function Skills() {
  return (
    <footer className="bg-white py-6 px-6 mt-auto w-full flex justify-center">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {skills.map((skill, index) => (
          <figure key={index} className="flex flex-col items-center">
            <Image src={skill.src} alt={skill.alt} width={64} height={64} strategy="responsive" />
            <figcaption className="mt-2 text-center text-black text-sm">{skill.alt}</figcaption>
          </figure>
        ))}
      </div>
    </footer>
  )
}
