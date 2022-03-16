import styles from  "./../../styles/notFound.module.css"

const NotFound = () => {

    return(
       <>
           <a href="/home" className={styles.notFound}>
               <header className={styles.stopHeader}>
               </header>


               <div>
                   <div className={styles.starsec}>&nbsp;</div>
                   <div className={styles.starthird}>&nbsp;</div>
                   <div className={styles.starfourth}>&nbsp;</div>
                   <div className={styles.starfifth}>&nbsp;</div>
               </div>
               <div className={styles.lamp__wrap}>
                   <div className={styles.lamp}>
                       <div className={styles.cable}>&nbsp;</div>
                       <div className={styles.cover}>&nbsp;</div>
                       <div className={styles.inCover}>
                           <div className={styles.bulb}>&nbsp;</div>
                       </div>
                       <div className={styles.light}>&nbsp;</div>
                   </div>
               </div>

               <section className={styles.error}>

                   <div className={styles.error__content}>
                       <div className={`${styles.error__message} ${styles.message}`}>
                           <h1 className={styles.message__title}>Page Not Found</h1>
                           <p className={styles.message__text}>We're sorry, the page you were looking for isn't found here. The
                               link you followed may either be broken or no longer exists. Please try again, or take a
                               look at our.</p>
                       </div>
                       <div className={`${styles.errorNav} ${styles.eNav}`}>
                           <a href="/home" target="_blank" className={`${styles.eNav__link}`}>&nbsp;</a>
                       </div>
                   </div>


               </section>

           </a>
       </>
    );
}

export default NotFound;