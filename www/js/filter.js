add_action( 'rest_api_init', 'register_file_route', 10 );

  function register_file_route() {
      register_rest_route( 'acf/v2', '/evento', array(
          array(
              'methods'  => WP_REST_Server::READABLE,
              'callback' => 'get_file',
          ),
      ) );
  }

  function get_file( WP_REST_Request $request ) {
      $filter = $request->get_param( 'filter' );
      $data   = array();

      $args = array(
          'posts_per_page' => -1,
          'post_type'      => 'evento',
      );

      if ( is_array( $filter ) && array_key_exists( 'category', $filter ) ) {
          $args['category_name'] = $filter['category'];
      }

      $evento = get_posts( $args );

      if ( ! empty( $evento ) ) {
          foreach( $evento as $post ) {
              $acf = get_fields( $post->ID );
              if ( ! empty( $acf ) ) {
                  $data[] = array_merge( array( 'id' => $post->ID ), $acf );
              }
          }
      }

      return $data;
  } 