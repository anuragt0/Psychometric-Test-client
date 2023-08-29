import React from 'react'

export const About = () => {
    return (
        <>
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
