import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { getListLane } from '@/apis/datatable.repository';
import { useEffect } from 'react';
import PageContainer from '@/layouts/PageContainer';
import MainLayout from '@/layouts/MainLayout';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const montserrat = Montserrat({ subsets: ['latin'] });

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB9tgLHlQrmLG483KhGze7yA5H-CIwY3PE",
//   authDomain: "nexttestdeploy.firebaseapp.com",
//   projectId: "nexttestdeploy",
//   storageBucket: "nexttestdeploy.appspot.com",
//   messagingSenderId: "1049503146465",
//   appId: "1:1049503146465:web:ee7758dd8f5ec1d1adb2a0",
//   measurementId: "G-P1K8CM2GKY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Home() {
  return (
    <>
      <Head>
        <title>Common Component Building</title>
        <meta name="description" content="Testing create new application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${montserrat.className} relative min-h-screen`}>
        <MainLayout>
          <PageContainer />
        </MainLayout>
      </div>
    </>
  );
}
