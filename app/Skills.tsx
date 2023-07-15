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
    <footer className="bg-secondary py-6 px-6 mt-auto w-full flex justify-center">
      <div className="flex space-x-6">
        {skills.map((skill, index) => (
          <figure key={index} className="flex flex-col items-center space-y-2 skill-icon">
            <div className="h-8 w-8 relative">
              <Image src={skill.src} alt={skill.alt} layout="fill" objectFit="contain" />
            </div>
            <figcaption className="text-center text-tertiary text-sm hidden group-hover:block">{skill.alt}</figcaption>
          </figure>
        ))}
      </div>
    </footer>
  )
}
