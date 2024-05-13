import React from 'react';
import type { SVGProps } from 'react';

// export function ArrowForward(props: SVGProps<SVGSVGElement>) {
// 	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17.079 12.5H5v-1h12.079l-5.792-5.792L12 5l7 7l-7 7l-.713-.708z"></path></svg>);
// }

export function ArrowForward(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} d="m268 112l144 144l-144 144m124-144H100"></path></svg>);
}