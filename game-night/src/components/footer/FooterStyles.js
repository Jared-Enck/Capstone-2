import styled from 'styled-components';

export const Box = styled.div`
padding: 3rem 2rem .5rem 2rem;
background: #D3D3D3;
position: absolute;
bottom: 0;
width: 100%;


@media (max-width: 1000px) {
	padding: 3rem 2rem .5rem 2rem;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: center;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(2,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(2,
						minmax(200px, 1fr));
}
`;

export const P = styled.p`
text-align: center;
margin: 0;
`

export const FooterLink = styled.a`
color: black;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
`;
