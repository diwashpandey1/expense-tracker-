
function Works() {
  
  return (
    <section className="w-[100%] h-[60vh] flex justify-center items-center mb-[60px] mb:mb-0">
      <div className="content h-auto md:h-[80%] w-[100%] flex flex-col items-center justify-center  bg-[#ECFDF5]">
          <h2 className="text-black text-[1.6em] font-bold mb-[40px]">How it Works ?</h2>
          <div className="flex flex-col md:flex-row justify-around w-[90%] items-center ">
            <div className="flex flex-col gap-[20px] items-center w-auto md:w-[30%] mb-10 md:mb-0">
              <span className="w-[50px] h-[50px] bg-[#D1FAE5] rounded-[50%] flex justify-center items-center">1</span>
              <h3 className="text-[1.4em] md:text-[1.2em] font-semibold">Open Expense-Tracker</h3>
            </div>
            <div className="flex flex-col gap-[20px] items-center w-auto md:w-[30%] mb-10 md:mb-0">
              <span className="w-[50px] h-[50px] bg-[#D1FAE5] rounded-[50%] flex justify-center items-center">2</span>
              <h3 className="text-[1.4em] md:text-[1.2em] font-semibold">Track Expences</h3>
            </div>
            <div className="flex flex-col gap-[20px] items-center w-auto md:w-[30%] mb-10 md:mb-0">
              <span className="w-[50px] h-[50px] bg-[#D1FAE5] rounded-[50%] flex justify-center items-center">3</span>
              <h3 className="text-[1.4em] md:text-[1.2em] font-semibold">Get Insights</h3>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Works;