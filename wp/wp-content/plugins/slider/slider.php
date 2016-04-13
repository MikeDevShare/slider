<?php
/**
 * Plugin Name: SLider
 * Plugin URI: http://bestwebsoft.com/products
 * Description: HTML5 Responsive Slider
 * Version: 0.0.01
 * Author: 
 * Author URI: http://bestwebsoft.com/
 * License: GPLv2 or later
*/

/*  © Copyright 2015  BestWebSoft  ( http://support.bestwebsoft.com )

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
* Function to display admin menu.
*/


if ( ! function_exists( 'sldrp_admin_menu' ) ) {
    function sldrp_admin_menu() {
        
        add_submenu_page( 'bws_plugins', __( 'Renty Car Pro Settings', 'sldrp' ), 'Renty Car Pro', 'manage_options', 'renty-car-pro-settings', 'sldrp_settings_page' );
    }
}
if ( ! function_exists( 'sldrp' ) ) {
    function sldrp() {
        load_plugin_textdomain( 'sldrp', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
    }
}

if ( ! function_exists( 'sldrp_plugin_activation' ) ) {
    function sldrp_plugin_activation() {

        /* Trigger our function that registers the custom post type */
        sldrp_setup_post_types();
        sldrp_install();

        /* Clear the permalinks after the post type has been registered */
        flush_rewrite_rules();

    }
}
if ( ! function_exists( 'sldrp_install' ) ) {
    function sldrp_install() {
    }
}
if ( ! function_exists( 'sldrp_setup_post_types' ) ) {
    function sldrp_setup_post_types() {
        register_post_type('sldrp_post',
        array(
            'labels' => array(
                'name' => __('Slider'),
                'singular_name' => __('Slider')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('thumbnail','title'),
        )
    );
    }
}
if ( ! function_exists( 'sldrp_add_custom_box' ) ) {
    function sldrp_add_custom_box() {
            add_meta_box(
                'slider-info-metabox',
                __( "Slider Info", 'sldpr' ),
                'sldrp_info_metabox',
                'sldrp_post',
                'advanced',
                'high'
            );
    }
}

if ( ! function_exists( 'sldrp_info_metabox' ) ) {
    function sldrp_info_metabox( $post ) {
        ?>
        <p>
            <label for="rntcrpr-location"><?php _e( "Location", 'rntcrpr' ); ?>:<br />
                <input type="text" id="rntcrpr-location" name="rntcrpr_location" size="40" value="<?php if ( ! empty( $car_location ) ) echo $car_location; ?>" /></label>
        </p>
        <?php
    }
}
if ( ! function_exists( 'sldrp_init' ) ) {
    function sldrp_init() {
        global $sldrp_plugin_info;
        /* Trigger our function that registers the custom post type */
        sldrp_setup_post_types();

        
    }
}
if ( ! function_exists( 'sldrp_enqueue_scripts' ) ) {
    function sldrp_enqueue_scripts() {

    }
}
register_activation_hook( __FILE__, 'sldrp_plugin_activation' );
//add_action( 'plugins_loaded', 'sldrp_plugin_loaded' );
add_action( 'init', 'sldrp_init' );
add_action( 'admin_menu', 'sldrp_admin_menu' );
add_action( 'add_meta_boxes', 'sldrp_add_custom_box' );

add_action( 'wp_enqueue_scripts', 'sldrp_enqueue_scripts' );

