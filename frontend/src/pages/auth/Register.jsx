import Logo from '../../assets/logo-icon-big.svg';
const Register = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen text-black">
        <div className="w-[550px] shadow-md shadow-gray rounded-md p-10 border-[1px] border-gray">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-black mb-5">Sign Up</h1>
              <p className="text-dark-gray">We're happy to see you here!</p>
            </div>
            <img src={Logo} alt="" className="w-[150px] h-auto object-cover" />
          </div>
          <div>
            <form>
              <label className="text-lg font-semibold ">User Name:</label>
              <br />
              <input
                type="text"
                className="w-[80%] rounded-md h-12 px-4 shadow-sm shadow-gray border-[1px] border-gray my-2"
              />
              <br />
              <label className="text-lg font-semibold ">Email address:</label>
              <br />
              <input
                type="email"
                className="w-[80%] rounded-md h-12 px-4 shadow-sm shadow-gray border-[1px] border-gray my-2"
              />
              <br />
              <label className="text-lg font-semibold">Password</label>
              <br />
              <input
                type="password"
                className="w-[80%] rounded-md h-12 px-4 shadow-sm shadow-gray border-[1px] border-gray my-2"
              />
              <br />
              <button className="rounded-[50px] bg-primary w-[130px] my-4 text-white py-1 text-[17px] font-roboto font-semibold">
                SIGN UP
              </button>
              <p className="font-[600] text-[17px] mb-4">
                Already Have An Account? <span className="text-primary text-lg cursor-pointer">LOG IN </span>now!
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
