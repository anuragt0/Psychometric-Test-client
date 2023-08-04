import React from 'react'
import { Link } from 'react-router-dom'
import './page.css'
import Image1 from './images/Goal-amico.png'
import Image2 from './images/Seamstress-bro.png'
import Image3 from './images/Webinar.png'
import { Footer } from './Footer'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import videoFile from './images/Worklife.mp4'
import { useState } from 'react';
import { useInView } from 'framer-motion' // refer slide.jsx
import { staggerContainer } from './framer'
import { TypingText } from './text'
import { useRef } from 'react'
import { headerVariants, textVariant } from './framer'




const Page = () => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const buttonref = useRef(null);
    const buttonisInView = useInView(buttonref, { once: false });

    const [isLoading, setIsLoading] = useState(true);

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    return (
        <>

            <div className='container-page1'>
                <div className='img-container'>

                    <video className='image-top' controls={false} autoPlay muted
                        onLoadedData={handleLoadedData}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    >
                        <source src={videoFile} type="video/mp4" />
                        Sorry, your browser doesn't support videos.
                    </video>

                </div>

                <div className='container-2'>
                    <div className='fade-in-from-right'>
                        <motion.div variants={textVariant}
                            initial="hidden"
                            whileInView="show">

                            <motion.div className="text-top"
                                whileHover={{ scale: 1.1, originX: 0 }} transition={{ type: 'spring', stiffness: 300 }}
                            >
                                TAKE A </motion.div>
                            <motion.div className='text-top text-top-deco'
                                whileHover={{ scale: 1.1, originX: 0 }} transition={{ type: 'spring', stiffness: 300 }}
                            >
                                STEP AHEAD</motion.div>
                            <motion.div className='text-top'
                                whileHover={{ scale: 1.1, originX: 0 }} transition={{ type: 'spring', stiffness: 300 }}
                            >
                                IN YOUR</motion.div>
                            <motion.div className='text-top text-top-deco'
                                whileHover={{ scale: 1.1, originX: 0 }} transition={{ type: 'spring', stiffness: 300 }}
                            >
                                BUSINESS</motion.div>
                        </motion.div>
                        <div className='hero-btn-wrap'>
                            <motion.a href='#start-test' className='btn'
                                whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
                                whileTap={{ scale: 0.9, backgroundColor: '#a4acff', color: 'rgb(37, 23, 107)' }}

                            >
                                KNOW MORE</motion.a>

                            <Link to='/test/instructions' style={{ textDecoration: 'nwrap' }}>
                                <motion.a className='btn'
                                    whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
                                    whileTap={{ scale: 0.9, backgroundColor: '#a4acff', color: 'rgb(37, 23, 107)' }}

                                >START TEST<span className='arrow'>&rarr;</span></motion.a></Link>
                                    </div>

                    </div>
                </div>

            </div >

            {/* PAGE 2 */}


            <section id='start-test' className='container-page2' ref={ref}>

                <div className='wrap'>
                    <div className='text-container'>
                        <motion.h2
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: .5 }}
                            className='text'
                        ><TypingText
                                title="SELF COMPLIANCE TEST"
                                textStyles="text-center" />
                        </motion.h2>

                        <p className='para'> Assess your compliance mindset with our self-compliance test. Discover invisible mental roadblocks and gain insights into informed decision-making.</p>
                    </div>


                    <InView triggerOnce>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: inView ? 1 : 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <img src={Image1} className='image' />
                            </motion.div>
                        )}
                    </InView>


                </div>

                <div className='wrap'>
                    <InView triggerOnce>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: inView ? 1 : 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <img src={Image2} className='image' />
                            </motion.div>
                        )}
                    </InView>


                    <div className='text-container' style={{ padding: '0 20px' }}>

                        <motion.h2
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: .5 }}
                            className='text'
                        ><TypingText
                                title="Partner with CAxpert"
                                textStyles="text-center" />
                        </motion.h2>

                        <p className='para'> CAxpert (CAX) provides accounting solutions to small business owners. Let us explain analytics behind the numbers and help you scale your business. Partnered with WEP since 2019.</p>
                    </div>
                </div>

                <div className='wrap'>

                    <div className='text-container'>
                        <motion.h2
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: .5 }}
                            className='text'
                        ><TypingText
                                title="Start Your Test Today"
                                textStyles="text-center" />
                        </motion.h2>

                        <p className='para'> Uncover your compliance mindset and understand where you stand in different social influence scenarios. Get valuable insights for your business decisions.</p>
                    </div>

                    <InView triggerOnce>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: inView ? 1 : 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <img src={Image3} className='image' />
                            </motion.div>
                        )}
                    </InView>
                </div>


                <div className='btn-wrap' ref={buttonref} >

                    <Link to='/test/instructions' style={{ textDecoration: 'nwrap' }}>
                        <motion.button className='btn btn-bottom'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9, backgroundColor: '#a4acff' }}
                            style={{
                                transform: buttonisInView ? "none" : "translateX(-200px)",
                                opacity: buttonisInView ? 1 : 0,
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
                            }}
                        >START YOUR TEST<span className='arrow'>&rarr;</span></motion.button></Link>
                </div>

            </section>

            <Footer />

        </>
    )
}

export default Page