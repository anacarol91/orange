utils = {
	
  setFavoritos: function (data, favoritos) {

    if(favoritos) {
      for(var i = 0; i < data.length; i++) {
        data[i].favoritado = false;   
      }

      for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < favoritos.length; j++) {
          if(data[i].id ===  favoritos[j].id) {
            data[i].favoritado = true;
          }
        }      
      }
    }
    return data;
  },

  setFavorito: function (item, favoritos) {

    if(favoritos) {
    	item.favoritado = false; 

	    for(var j = 0; j < favoritos.length; j++) {
	      if(item.id ===  favoritos[j].id) {
	        item.favoritado = true;
	      }
	    }  
    }
    return item;
  }
}