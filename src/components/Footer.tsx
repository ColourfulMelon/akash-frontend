export default function  Footer() {
    return(
        <section className='bg-zinc-950 flex flex-col align-middle text-white w-full pb-10 text-center'>

            <div className='max-w-screen-lg mx-auto'>
                <h3 className='uppercase font-black mt-20 text-white text-lg text-center'>Okay that&apos;s it, you
                    can stop scrolling now!</h3>
            </div>
            <div className='flex justify-center mr-[25rem]'>

            </div>

            {/*columns*/}
            <div className='grid grid-cols-3 gap-10 ml-10 mr-40 mt-20'>
                {/*col 1*/}
                <div className='row-span-1 flex flex-col'>

                </div>
                {/*col 2*/}
                <div className='row-span-1 flex flex-col gap-8'>

                </div>
                {/*col 3*/}
                <div className='row-span-1'>

                </div>


            </div>

            {/*copyright */}
            <p>© {(new Date).getFullYear()} Dev3 Studio. All rights reserved</p>
        </section>
    );
}