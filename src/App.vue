<template>
	<v-app id="app">
		<v-navigation-drawer v-model="sidebar" app>
			<v-list>
				<v-list-tile
				v-for="item in menuItems"
				:key="item.title"
				:to="item.path">
			  		<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
			  		</v-list-tile-action>
			  		<v-list-tile-content>{{ item.title }}</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-if="isAuthenticated" @click="userSignOut">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>Sign Out</v-list-tile-content>
				</v-list-tile>
		  	</v-list>
		</v-navigation-drawer>

		<v-toolbar app>
			<span class="hidden-sm-and-up">
				<v-toolbar-side-icon @click="sidebar = !sidebar">
				</v-toolbar-side-icon>
			</span>
			<v-toolbar-title>
				<router-link to="/" tag="span" style="cursor: pointer">
					{{ appName }}
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
				<v-btn
		  			flat
		  			v-for="item in menuItems"
		  			:key="item.title"
		  			:to="item.path">
		  				<v-icon left dark>{{ item.icon }}</v-icon>
		  				{{ item.title }}
				</v-btn>
				<v-btn v-if="isAuthenticated" flat @click="userSignOut">
    				<v-icon left dark>exit_to_app</v-icon>
    				Sign Out
  				</v-btn>
	  		</v-toolbar-items>
		</v-toolbar>

		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data () {
	  return {
		sidebar: false
	  }
	},
	computed: {
		isAuthenticated () {
  			return this.$store.getters.isAuthenticated;
		},
		menuItems() {
			if (this.isAuthenticated) {
				return [
					{ title: 'Home', path: '/home', icon: 'home' }
				];

			} else {
				return [
					{ title: 'Sign Up', path: '/signup', icon: 'face' },
					{ title: 'Sign In', path: '/signin', icon: 'lock_open' }
				];
			}
		},
		appName () {
			return this.$store.state.appName;
		}
	},
	methods: {
  		userSignOut () {
    		this.$store.dispatch('userSignOut');
  		}
	}
}
</script>

<style>

</style>
