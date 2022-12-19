import React, { useRef, useState } from 'react'
import {
	Input,
	Button,
	Box,
	Flex,
	Text,
	Link,
} from '@chakra-ui/react';
import '../signinup.css'
import logo from '../images/log.svg'
import register from '../images/register.svg'
import { SignInUpType } from '../types/types';
const SignInUp = ({ signIn, setSignIn }: SignInUpType) => {
	const ref = useRef(null)
	const [activeForm, setActiveForm] = useState<string>('signIn')

	const signForm = () => {
		if (activeForm === 'signIn') {
			setActiveForm('signUp')
		}
		if (activeForm === 'signUp') {
			setActiveForm('signIn')
		}
	}
	const submitForm = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		setSignIn(true)
	}
	return (
		<>
			<Box
				className={`container ${activeForm === 'signUp' ? 'sign-up-mode' : ''}`}
				top={`${!signIn ? '0' : '-100vh'}`}
				pos="absolute"
				left="0"
				w="100%"
				minH="100vh"
				bgColor="#fff"
				overflow="hidden"
				zIndex="100"
				transition="all 0.5s ease-in-out"
			>
				<Box className='forms-container'>
					<Box className='signin-signup'>
						<form action="" className="sign-in-form">
							<Text className="title">Sign in</Text>
							<Box className="input-field">
								<i className="fas fa-user"></i>
								<Input
									ref={ref}
									variant="custom"
									type="text"
									placeholder='Username'
									_focus={{ borderColor: "transparent" }}
									disabled={(activeForm === 'signUp') ? true : false}
								/>
							</Box>
							<Box className="input-field">
								<i className="fas fa-lock"></i>
								<Input
									variant="custom"
									type="password"
									placeholder='Password'
									_focus={{ borderColor: "transparent" }}
									disabled={(activeForm === 'signUp') ? true : false}
								/>
							</Box>
							<Input
								type="submit"
								value="Login"
								className='btn solid'
								variant="custom"
								_focus={{ border: '1px solid black' }}
								w="100%"
								maxW="20rem"
								onClick={submitForm}
								disabled={(activeForm === 'signUp') ? true : false}
							/>
						</form>

						<form action="" className="sign-up-form">
							<Text className="title">Sign up</Text>
							<Box className="input-field">
								<i className="fas fa-user"></i>
								<Input
									type="text"
									placeholder='Username'
									variant="custom"
									_focus={{ borderColor: "transparent" }}
									disabled={(activeForm === 'signIn') ? true : false}
								/>
							</Box>
							<Box className="input-field">
								<i className="fas fa-envelope"></i>
								<Input
									type="text"
									placeholder='Email'
									variant="custom"
									_focus={{ borderColor: "transparent" }}
									disabled={(activeForm === 'signIn') ? true : false}
								/>
							</Box>
							<Box className="input-field">
								<i className="fas fa-lock"></i>
								<Input
									type="password"
									placeholder='Password'
									variant="custom"
									_focus={{ borderColor: "transparent" }}
									disabled={(activeForm === 'signIn') ? true : false}
								/>
							</Box>
							<Input
								type="submit"
								value="Sign up"
								className='btn solid'
								variant="custom"
								_focus={{ borderColor: "transparent" }}
								w="100%"
								maxW="20rem"
								onClick={submitForm}
								disabled={(activeForm === 'signIn') ? true : false}
							/>
						</form>
					</Box>
				</Box>
				<Box className="panels-container">
					<Box className="panel left-panel">
						<Box className="content">
							<Text>New here?</Text>
							<Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem minus facere!</Text>
							<Button
								onClick={signForm}
								className="btn transparent"
								id="sign-up-btn"
								borderRadius="3em"
								disabled={(activeForm === 'signUp') ? true : false}
								_hover={{
									background: "#inherit",
									color: "white"
								}}
							>
								Sign up
							</Button>
						</Box>
						<img src={logo} className="image" alt="log.svg" />
					</Box>
					<Box className="panel right-panel">
						<Box className="content">
							<Text>One of us?</Text>
							<Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem minus facere!</Text>
							<Button
								onClick={signForm}
								className="btn transparent"
								id="sign-in-btn"
								borderRadius="3em"
								disabled={(activeForm === 'signIn') ? true : false}
								_hover={{
									background: "#inherit",
									color: "white"
								}}
							>
								Sign in
							</Button>
						</Box>
						<img src={register} className="image" alt="register.svg" />
					</Box>
				</Box>
			</Box>
		</>
	)
}
export default SignInUp;