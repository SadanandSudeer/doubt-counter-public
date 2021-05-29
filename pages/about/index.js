import aboutStyles from '../../styles/About.module.css';
import Image from 'next/image';
import Head from 'next/head';
export default function Home() {
  return (
    <div className={aboutStyles.content}>
      <Head>
        <title>Kota Doubt Counter - About Us</title>
        <link rel="icon" href="/assets/images/KDC_Logo_3.png"></link>
      </Head>
      <p >
      Kota Doubt Counter has been developed to make learning simple. By helping you 
      get over problems you are struggling with we intend to help you optimize your learning time. 
      Our endeavor is to ensure you find solution for any problem you are looking for be it 
      questions related to JEE Main, NEET, JEE Advanced exams or XII Boards. 
      Its free with no adds so you focus on studies and nothing else!
      </p>
      
      <p>
        We at Kota Doubt Counter intend to bring the “Expert Kota Teachers” verified solutions to the complex Problems of IIT-JEE and NEET exams.
      </p>
      <p>
        Right now, we are starting small. With our own efforts we have created solutions to 10,000+ Physics problems. 
       </p>
       <p>We intend to add around 1,000 solutions per week. 
      </p>
      <p><b>Why choose us: </b></p>
      <p>As we know that, internet is filled with video solutions from various Edu-Tech companies, 
      </p>
      <p>most often these are created by young and not-so-experienced teachers and are often contain mistakes and even wrong concepts and solutions.
      We at Kota Doubt Counter intend to provide correct solutions, with right concepts. 
      </p>
      <p>As teachers, we are sure this effort of ours, will create bright future engineers and doctors, 
      with correct fundamentals and will serve the Society and Nation well. 
      </p>
      <p>We strongly believe there is <b>No Shortcut to Success!</b></p> 
      <div className={aboutStyles.founder}>
        <div className={aboutStyles.card}><div style={{display: "inline", margin: "0 auto", padding: '3px', fontWeight:'bold', fontSize:"1.5rem"}}>Our Founders</div></div>
        <div className={aboutStyles.card}>
          <div className={aboutStyles.grid} style={{float:'left'}}>
            <Image src="/assets/images/RD_Sir.jpg" width="130px"  height="140px"/>
            <div className={aboutStyles.columnLeft}><h2>Ritesh Dahiya Sir</h2>
            B. Tech. IIT-Delhi<br/>
            Experience - 22 years.</div>
          </div>
          <div style={{float:'none', width:'100%'}}>
          </div>
          <div className={aboutStyles.grid} style={{float:'right'}}>
            <Image src="/assets/images/jyoti.png" width="130px"  height="140px"/>
            <div className={aboutStyles.columnLeft}><h2>Jyoti M Sadanand</h2>
            Master's of Science (Data Science)<br/>
            Experience - 23 years.</div>
          </div>        
        </div>
      </div>
      <div className={aboutStyles.founder}>
        <div className={aboutStyles.row}>
          <div className={aboutStyles.columnLeft}><b>CALL SUPPORT:</b></div>
          <div className={aboutStyles.columnRight}>+91 9214 222 112 / 13 / 14</div>
        </div>
        <div className={aboutStyles.row}>
          <div className={aboutStyles.columnLeft}><b>E-Mail SUPPORT:</b></div>
          <div className={aboutStyles.columnRight}><a href="mailto:contactkotadc@gmail.com">KDC support(ContactKotaDC@gmail.com)</a></div>
        </div>
        <div className={aboutStyles.row}>
          <div className={aboutStyles.columnLeft}><b>LOCATION:</b></div>
          <div className={aboutStyles.columnRight}>4-J-28, Mahaveer Nagar-3, Kota</div>
        </div>
      </div>
    </div>
  );
}
