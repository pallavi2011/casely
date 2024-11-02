import React, { ReactNode } from 'react'
import Wrapper from '../components/Wrapper'
import Steps from '../components/Steps'

const layout = ({children}:{children: ReactNode}) => {
  return (
    <Wrapper className='flex-1 flex flex-col'>
      <Steps/>
        {children}
    </Wrapper>
  )
}

export default layout