import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function CartCount({ count }) {
	return (
		<AnimationStyles>
			<TransitionGroup>
				<CSSTransition
					unmountOnExit
					classNames="count"
					className="count"
					key={count}
					timeout={{ enter: 4000, exit: 4000 }}
				>
					<Dot>{count}</Dot>
				</CSSTransition>
			</TransitionGroup>
		</AnimationStyles>
	);
}

/* The style classes in this style component is provided from Transition-Group and CSS Transition. 
    When an event is triggered, it wil render out 2 div with the previous item and the next item (this help with stlying transition)
    
    If confused still, trigger the add to cart button and watch the element in inspection
*/
const AnimationStyles = styled.span`
	position: relative;
	.count {
		display: block;
		position: relative;
		transition: all 0.4s;
		backface-visibility: hidden;
	}
	/* Initial State of the entered Dot */
	.count-enter {
		transform: scale(4) rotateX(0.5turn);
	}
	.count-enter-active {
		transform: rotateX(0);
	}
	.count-exit {
		top: 0;
		position: absolute;
		transform: rotateX(0);
	}
	.count-exit-active {
		transform: scale(4) rotateX(0.5turn);
	}
`;

const Dot = styled.div`
	background: ${(props) => props.theme.red};
	color: white;
	border-radius: 50%;
	padding: 0.5rem;
	line-height: 2rem;
	min-width: 3rem;
	margin-left: 1rem;
	font-weight: 100;
	/* Very important 2 fields below */
	font-feature-settings: "tnum";
	font-variant-numeric: tabular-nums;
`;

export default CartCount;
