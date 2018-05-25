import Vue from 'vue';
import Router from 'vue-router';
import { auth } from 'firebase';

import Landing from '../components/Landing';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Home from '../components/Home';
import NotFound from '../components/NotFound';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'landing',
			component: Landing
		},
		{
			path: '/signin',
			name: 'signin',
			component: Signin
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '*',
			name: 'notfound',
			component: NotFound
		}
	]
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const isAuthenticated = auth().currentUser;
	if (requiresAuth && !isAuthenticated) {
		next('/signin');

	} else {
		next();
	}
});

router.afterEach(() => {
	window.requestAnimFrame = (() => {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame;
	})();

	var scrollToY = (scrollPosY, speedParam, easingParam) => {

		var scrollY = window.scrollY || document.documentElement.scrollTop,
			scrollTargetY = scrollPosY || 0,
			speed = speedParam || 2000,
			easing = easingParam || 'easeOutSine',
			currentTime = 0;

		var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

		var easingEquations = {
			easeOutSine: (pos) => {
				return Math.sin(pos * (Math.PI / 2));
			},
			easeInOutSine: (pos) => {
				return (-0.5 * (Math.cos(Math.PI * pos) - 1));
			},
			easeInOutQuint: (pos) => {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow((pos - 2), 5) + 2);
			}
		};

		var tick = () => {
			currentTime += 1 / 60;

			var p = currentTime / time;
			var t = easingEquations[easing](p);

			if (p < 1) {
				window.requestAnimFrame(tick);
				window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));

			} else {
				window.scrollTo(0, scrollTargetY);
			}
		};

		tick();
	};

	scrollToY(0, 400, 'easeInOutQuint');
});

export default router;
