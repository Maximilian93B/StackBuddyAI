import { FaDatabase, FaNode, FaReact, FaVuejs, FaAngular, FaCss3, FaServer } from 'react-icons/fa';

export const techCategories = {
    Databases: [
      { id: 'mongodb', icon: <FaDatabase />, label: 'MongoDB', description: 'A document-oriented NoSQL database used for high volume data storage.'},
      { id: 'SQL', icon: <FaDatabase />, label: 'SQL Server', description: 'A relational database management system developed by Microsoft.'},
      { id: 'PostgreSQL', icon: <FaDatabase />, label: 'PostgreSQL', description: 'An open source relational database known for reliability and data integrity.'},
      { id: 'Redis', icon: <FaDatabase />, label: 'Redis',  description: 'An in-memory data structure store, used as a database, cache, and message broker.'},
      { id: 'MariaDB', icon: <FaDatabase />, label: 'MariaDB', description: 'A community-developed fork of MySQL intended to remain free under the GNU GPL.'},
      { id: 'OracleDatabase', icon: <FaDatabase />, label: 'Oracle Database',  description: 'A multi-model database management system primarily designed for enterprise grid computing.'},
      { id: 'Firebase', icon: <FaDatabase />, label: 'Firebase', description: 'A platform developed by Google for creating mobile and web applications.'},
      { id: 'Cassandra', icon: <FaDatabase />, label: 'Cassandra',  description: 'A highly scalable, high-performance distributed database designed to handle large amounts of data.'},
    ],
    Server: [
      { id: 'nodejs', icon: <FaNode />, label: 'Node.js', description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.'},
      { id: 'Express', icon: <FaServer />, label: 'Express', description: 'A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'},
      { id: 'AngularServer', icon: <FaAngular />, label: 'Angular Universal', description: 'Server-side rendering (SSR) with Angular for rendering Angular applications on the server.'},
      { id: 'Django', icon: <FaServer />, label: 'Django', description: 'A high-level Python web framework that encourages rapid development and clean, pragmatic design.'},
    ],
    FrontEnd: [
      { id: 'React', icon: <FaReact />, label: 'React',  description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.'},
      { id: 'Vue', icon: <FaVuejs />, label: 'Vue.js',  description: 'The Progressive JavaScript Framework that is approachable, versatile, and performant.'},
      { id: 'Angular', icon: <FaAngular />, label: 'Angular',  description: 'A platform for building mobile and desktop web applications using Typescript/JavaScript and other languages.'},
    ],
    FrontendFW: [
      { id: 'Svelte', icon: <FaCss3 />, label: 'Svelte', description: 'A radical new approach to building user interfaces, where the work to generate the app happens at build time.'},
      { id: 'NextJs', icon: <FaCss3 />, label: 'Next.js', description: 'A React framework for production that provides hybrid static & server rendering, and route pre-fetching.'},
      { id: 'NuxtJs', icon: <FaCss3 />, label: 'Nuxt.js', description: 'An intuitive Vue framework that simplifies the development of universal or single-page Vue apps.'},
    ],
    CSSFrameWorks: [
      { id: 'Tailwind', icon: <FaCss3 />, label: 'Tailwind CSS', description: 'A utility-first CSS framework for rapidly building custom user interfaces.'},
      { id: 'Bootstrap', icon: <FaCss3 />, label: 'Bootstrap',  description: 'The most popular HTML, CSS, and JS library in the world for building responsive, mobile-first projects on the web.'},
      { id: 'MaterialUI', icon: <FaCss3 />, label: 'Material-UI',  description: 'A popular React UI framework that features designs based on Material Design.'},
    ],
  };
