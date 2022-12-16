import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: ""
			},
			h1: {
				fontSize: "1.5rem",
				color: "#fff"
			},
		})
	},
	components: {
		Input: {
			baseStyle: {
				field: {
					_focus: {
						borderBottom: "2px solid transparent"
					}
				}
			}
		}
	},
	breakpoints: {
		sm: "319.98px",
		md: "767.98px",
		lg: "959.98px",
		xl: "1199.98px"
	}
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={customTheme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>

);
