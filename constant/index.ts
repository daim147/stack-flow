import ROUTES from './routes';

export enum FORM_TYPES {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
}

export const sidebarLinks = [
	{
		imgURL: '/icons/home.svg',
		route: '/',
		label: 'Home',
	},
	{
		imgURL: '/icons/users.svg',
		route: '/community',
		label: 'Community',
	},
	{
		imgURL: '/icons/star.svg',
		route: '/collection',
		label: 'Collections',
	},
	{
		imgURL: '/icons/suitcase.svg',
		route: '/jobs',
		label: 'Find Jobs',
	},
	{
		imgURL: '/icons/tag.svg',
		route: '/tags',
		label: 'Tags',
	},
	{
		imgURL: '/icons/user.svg',
		route: '/profile',
		label: 'Profile',
	},
	{
		imgURL: '/icons/question.svg',
		route: '/ask-question',
		label: 'Ask a question',
	},
];

export const techMap: { [key: string]: string } = {
	// JavaScript variations
	javascript: 'devicon-javascript-plain',
	js: 'devicon-javascript-plain',

	// TypeScript variations
	typescript: 'devicon-typescript-plain',
	ts: 'devicon-typescript-plain',

	// React variations
	react: 'devicon-react-original',
	reactjs: 'devicon-react-original',

	// Next.js variations
	nextjs: 'devicon-nextjs-plain',
	next: 'devicon-nextjs-plain',

	// Node.js variations
	nodejs: 'devicon-nodejs-plain',
	node: 'devicon-nodejs-plain',

	// Bun.js variations
	bun: 'devicon-bun-plain',
	bunjs: 'devicon-bun-plain',

	// Deno.js variations
	deno: 'devicon-denojs-original',
	denojs: 'devicon-denojs-plain',

	// Python
	python: 'devicon-python-plain',

	// Java
	java: 'devicon-java-plain',

	// C++
	'c++': 'devicon-cplusplus-plain',
	cpp: 'devicon-cplusplus-plain',

	// C#
	'c#': 'devicon-csharp-plain',
	csharp: 'devicon-csharp-plain',

	// PHP
	php: 'devicon-php-plain',

	// HTML
	html: 'devicon-html5-plain',
	html5: 'devicon-html5-plain',

	// CSS
	css: 'devicon-css3-plain',
	css3: 'devicon-css3-plain',

	// Git
	git: 'devicon-git-plain',

	// Docker
	docker: 'devicon-docker-plain',

	// MongoDB
	mongodb: 'devicon-mongodb-plain',
	mongo: 'devicon-mongodb-plain',

	// MySQL
	mysql: 'devicon-mysql-plain',

	// PostgreSQL
	postgresql: 'devicon-postgresql-plain',
	postgres: 'devicon-postgresql-plain',

	// AWS variations
	aws: 'devicon-amazonwebservices-original',
	'amazon web services': 'devicon-amazonwebservices-original',

	// Firebase
	firebase: 'devicon-firebase-plain',

	// GraphQL
	graphql: 'devicon-graphql-plain',

	// Vue.js
	vue: 'devicon-vuejs-plain',
	vuejs: 'devicon-vuejs-plain',

	// Tailwind CSS
	tailwind: 'devicon-tailwindcss-plain',
	tailwindcss: 'devicon-tailwindcss-plain',

	// Angular
	angular: 'devicon-angularjs-plain',

	// jQuery
	jquery: 'devicon-jquery-plain',

	// SASS
	sass: 'devicon-sass-plain',

	// Laravel
	laravel: 'devicon-laravel-plain',

	// Ruby on Rails
	rails: 'devicon-rails-plain',
	ruby: 'devicon-rails-plain',

	// Redis
	redis: 'devicon-redis-plain',

	// Linux
	linux: 'devicon-linux-plain',

	// Jenkins
	jenkins: 'devicon-jenkins-plain',

	// Kubernetes
	kubernetes: 'devicon-kubernetes-plain',

	// Azure
	azure: 'devicon-azure-plain',
	'azure devops': 'devicon-azure-plain',

	// Google Cloud Platform
	gcp: 'devicon-googlecloud-plain',
	'google cloud': 'devicon-googlecloud-plain',

	// Bitbucket
	bitbucket: 'devicon-bitbucket-plain',

	// NGINX
	nginx: 'devicon-nginx-plain',

	// Blender
	blender: 'devicon-blender-plain',

	// Unity
	unity: 'devicon-unity-original',

	// Unreal Engine
	unreal: 'devicon-unrealengine-original',

	// Swift
	swift: 'devicon-swift-plain',

	// Kotlin
	kotlin: 'devicon-kotlin-plain',

	// Go
	go: 'devicon-go-plain',

	// Rust
	rust: 'devicon-rust-plain',

	// Dart
	dart: 'devicon-dart-plain',

	// Flask
	flask: 'devicon-flask-original',

	// Django
	django: 'devicon-django-plain',

	// Bootstrap
	bootstrap: 'devicon-bootstrap-plain',

	// Material-UI
	materialui: 'devicon-materialui-plain',
	'material ui': 'devicon-materialui-plain',

	// Adobe tools
	photoshop: 'devicon-photoshop-plain',
	illustrator: 'devicon-illustrator-plain',
	xd: 'devicon-xd-plain',
	premiere: 'devicon-premiere-plain',

	// Figma
	figma: 'devicon-figma-plain',

	// Inkscape
	inkscape: 'devicon-inkscape-plain',

	// Trello
	trello: 'devicon-trello-plain',

	// Jira
	jira: 'devicon-jira-plain',

	// Heroku
	heroku: 'devicon-heroku-plain',

	// Elasticsearch
	elasticsearch: 'devicon-elasticsearch-plain',

	// Redux
	redux: 'devicon-redux-original',

	// Three.js
	threejs: 'devicon-threejs-original',
};

export const hotQuestions = [
	{ _id: '1', title: 'How to create a custom hook in React?' },
	{ _id: '2', title: 'How to use React Query?' },
	{ _id: '3', title: 'How to use Redux?' },
	{ _id: '4', title: 'How to use React Router?' },
	{ _id: '5', title: 'How to use React Context?' },
];

export const popularTags = [
	{ _id: '1', name: 'react', questions: 100 },
	{ _id: '2', name: 'javascript', questions: 200 },
	{ _id: '3', name: 'typescript', questions: 150 },
	{ _id: '4', name: 'nextjs', questions: 50 },
	{ _id: '5', name: 'react-query', questions: 75 },
];
