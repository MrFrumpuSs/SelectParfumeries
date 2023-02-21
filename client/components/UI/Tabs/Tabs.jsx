import styles from './Tabs.module.scss'
import { motion, AnimatePresence } from "framer-motion";

const Tabs = ({tabs, setActiveTab, layout, activeTab, Component}) => {
    return (
       <>
            <div className={styles.tabs_wrapper}>
                <div className={styles.tabs}>
                    {
                        tabs.map((tab, index)=>
                            <div key={index} className={styles.tab_wrapper}>
                                <p key={tab.value} onClick={e=> setActiveTab(tab)} className={tab === activeTab ? [styles.tab, styles.active].join(' ') : styles.tab}>{tab.title}</p>
                                {tab === activeTab ?  <motion.div className={styles.underline} layoutId={layout}/> : null}
                            </div>
                            
                        )
                    }
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div initial={{ y: 10, opacity: 0 }} key={activeTab ? activeTab.value : "empty"} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }} className={styles.tab_content}>
                    {Component}
                </motion.div>
            </AnimatePresence>
       </>
    )
}

export default Tabs