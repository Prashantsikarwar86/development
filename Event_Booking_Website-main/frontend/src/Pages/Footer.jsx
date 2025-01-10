import React from 'react'
import styles from './Footer.module.css';
function Footer() {
  return (
    <div>
        <footer>
        <div className={styles.container}>
            <div>
                Administrative Offices : 600 South Clyde Morris Blvd, <br/> Daytona Beach, FL 32114-39000
            </div>
            <img src="https://th.bing.com/th/id/OIP.Dj7vVJWYLSXIGbZSWFnNkgHaFL?w=267&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt=""/>
            <div>
                Copyright &copy; 2019 Event Recommendation <br/> All right Reserved.
            </div>
        </div>

        <br/>

        <p>Directory | Accessibility | Civil Rights Equity & Title IX | Military Disclaimer | Terms of Use </p>

        <br/>

        <p>Follow us On :</p>
        <div className={styles.follow}>
            <a href="https://www.facebook.com/login.php/"><img className = {styles.logo} src="https://th.bing.com/th?q=Facebook+Logo+Design+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Facebook"/></a>
            <a href="https://www.instagram.com/"><img className = {styles.logo} src="https://th.bing.com/th?q=Instagram+Logo+Clear+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Instagram"/></a>
            <a href="https://twitter.com/i/flow/login"><img className = {styles.logo} src="https://th.bing.com/th?q=Twitter+X+Logo.png&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="twitter"/></a>
            <a href="https://www.linkedin.com/home"><img className = {styles.logo} src="https://th.bing.com/th?q=Free+LinkedIn+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="LinkedIn"/></a>
        </div>
    </footer>
    </div>
  )
}

export default Footer