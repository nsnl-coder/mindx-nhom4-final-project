import { TailSpin } from 'react-loader-spinner'

const Spinner = () => (
  <div className="w-full fixed bottom-0 flex justify-center mb-5" key={0}>
    <TailSpin
      height="40"
      width="40"
      color="#F81411"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
)

export default Spinner