import React from 'react'
import cardEco from '../../assets/images/cardEco.png'
import cardLitros from '../../assets/images/cardLitros.png'
import card from '../../assets/images/Card.png'
import styles from './mainView.module.css'

const MainView = () => {
    return (
        <div>
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                    <h3>Lava y protege</h3>
                </div>
            </div>
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                    <img src={card} className={styles.card} alt="logo" />
                </div>
            </div>
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                <button className={styles.btnView} >Ver más</button>
                </div>
            </div>
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                    <img src={cardEco} className={styles.logo} alt="logo" />
                    <img src={cardLitros} className={styles.logo} alt="logo" />
                </div>
            </div>
            
        </div>
    )
}

export default MainView;
