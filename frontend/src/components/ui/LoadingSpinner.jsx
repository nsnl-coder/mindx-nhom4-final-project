import { Oval } from 'react-loader-spinner'

const LoadingSpinner = () => {
  return (
    <Oval
      height={25}
      width={25}
      color="#292929"
      wrapperStyle={{}}
      wrapperClass="mt-4"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#dedede"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}

export default LoadingSpinner
