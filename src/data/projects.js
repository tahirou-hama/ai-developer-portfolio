 const projects = [
    {
        id: 1,
        slug: 'marketplace-niger',

        title: 'Marketplace Niger',

        category: 'Full-Stack E-Commerce',

        description:
            'A multi-vendor e-commerce platform being developed for the Nigerien market, connecting customers, sellers and delivery users through a single digital marketplace.',

        technologies: [
            'React',
            'Node.js',
            'Express.js',
            'MySQL',
            'JWT'
        ],

        features: [
            'Customer registration and authentication',
            'Seller registration and shop management',
            'Product management',
            'Shopping cart',
            'Order management',
            'Order tracking',
            'Delivery Management',
            'Admin shop approval',
            'Role-based access control'
        ],

        progress: [
            {
                title: 'Frontend Architecture',
                description:
                    'React application structure, routing and reusable interface components are being developed.',
                completed: true
            },

            {
                title: 'Authentication & User Roles',
                description:
                    'Customer, seller, delivery and administrator authentication and authorization workflows are being implemented.',
                completed: true
            },

            {
                title: 'Product Management',
                description:
                    'Product and shop management workflows are being developed for marketplace sellers.',
                completed: true
            },

            {
                title: 'Shopping Cart',
                description:
                    'Customers can manage products in their cart before placing orders.',
                completed: true
            },

            {
                title: 'Order Management',
                description:
                    'Order creation, status management and customer order tracking are being developed.',
                completed: true
            },

            {
                title: 'Delivery Workflow',
                description:
                    'Delivery-related workflows and order status progression are being implemented.',
                completed: true
            },

            {
                title: 'Payment Integration',
                description:
                    'Secure online payment integration is planned for a later development stage.',
                completed: false
            },

            {
                title: 'Production Deployment',
                description:
                    'The application will be prepaered for production deployment after the core features are completed and tested.',
                completed: false
            }
        ],

         problem:
        'Small businesses and independent sellers need accessible digital channels to present their products and manage online orders. The project was designed around the idea of bringing customers, sellers and delivery operations together within one marketplace.',

    solution:
        'Marketplace Niger is being developed as a multi-vendor e-commerce platform where customers can browse products, add items to a cart, place orders and track their deliveries. Sellers can manage their shops and products, while administrative workflows provide control over seller approval and marketplace operations.',

    architecture: [
        'React frontend for the user interface and client-side interactions',
        'Node.js and Express.js backend for REST API development',
        'MySQL database for users, shops, products and orders',
        'JWT-based authentication for secure user sessions',
        'Role-based authorization for customers, sellers, delivery users and administrators'
    ],

    security: [
        'JWT-based user authentication',
        'Protected API routes',
        'Role-based access control',
        'Server-side authorization',
        'Separation of customer, seller, delivery and admin permissions'
    ],

    challenges: [
        'Designing a marketplace structure that supports multiple user roles',
        'Managing relationships between users, shops, products and orders',
        'Implementing order tracking across different stages',
        'Designing secure authentication and authorization workflows',
        'Creating a frontend structure that can communicate cleanly with the backend API'
    ],

    learning: [
        'Designing full-stack applications around real-world business workflows',
        'Connecting a React frontend to a Node.js and Express API',
        'Working with relational data using MySQL',
        'Implementing authentication and role-based authorization',
        'Structuring a multi-user application for future scalability'
    ],


        role:
        'Full-Stack Developer',

        status:
        'In Development',

        github:
        '#',

        demo:
        '#',
    },

     {
        id: 2,
        slug: 'personal-finance-tracker',
        title: 'Personal Finance Tracker',
        category: 'Frontend Web Application',

        description:
            'A personal finance dashboard designed to help users monitor income, expenses, transactions and monthly financial activity.',

        technologies: [
            'HTML',
            'CSS',
            'JavaScript',
            'LocalStorage'
        ],

        features: [
            'Income tracking',
            'Expense tracking',
            'Transaction management',
            'Monthly financial overview',
            'Responsive dashboard',
            'Local data storage'
        ],

        role:
            'Frontend Developer',

        status:
            'Completed',

        github:
            '#',

        demo:
            '#'
    },

    {
        id: 3,
        slug: 'ai-cv-job-assistant',
        title: 'AI CV & Job Assistant',
        category: 'AI-Powered Application',

        description:
            'An AI-powered career assistant designed to help users create, improve and customize CVs and job applications based on specific opportunities.',

        technologies: [
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'AI',
            'JWT'
        ],

        features: [
            'AI-assisted CV improvement',
            'Job description analysis',
            'Job application assistance',
            'Professional content generation',
            'User authentication',
            'CV and application data management',
            'Personalized recommendations'
        ],

        role: 'Full-Stack AI Developer',

        status: 'Planned',

        github: '#',

        demo: '#'
    },

    {
        id: 4,
        slug: 'ai-developer-portfolio',
        title: 'AI-Powered Developer Portfolio',
        category: 'Full-Stack AI Application',

        description:
            'A professional developer portfolio combining moder web development, project case studies and an AI assistant designed to answer questions about my skills, experience and projects.',

        technologies: [
            'React',
            'Vite',
            'Node.js',
            'Express.js',
            'MySQL',
            'AI'
        ],

        features: [
            'Responsive portfolio',
            'Project case studies',
            'Skills and educations sections',
            'Contact system',
            'AI portfolio assistant',
            'Backend API',
            'Database integration'
        ],

        role:
            'Full-Stack Developer',

        status:
            'In Development',

        github:
            '#',

        demo:
            '#'
    }
];

export default projects;