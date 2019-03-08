class Api{
	async login(form){
		var formData = new FormData();
		formData.append("username", form.username);
		formData.append("password", form.password);
		const query = await fetch("/api/auth/login",{method: 'POST', body: formData});
		const data = await query.json();
		return {data: data, status: query.status};
	}

	async logout(token){
		const query = await fetch("/api/auth/logout",
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': token,
				}), 
			});
		return true;
	}

	async auth_user(token){
		const query = await fetch("/api/auth/user",
			{
				method: 'GET',
				headers: new Headers({
					'Authorization': token,
				}), 
			});
		const data = await query.json();
		return data;
	}

	async Register(formData){
		const query = await fetch("/api/auth/register",{method: 'POST', body: formData});
		const data = await query.json();
		return {data: data, status: query.status};
	}

	async tableros_list(token, own){
		const query = await fetch(`/app/list/?own=${own}`,
			{
				method: 'GET',
				headers: new Headers({
					'Authorization': token,
				}), 
			});
		const data = await query.json();
		return {data: data, status: query.status};
	}

	async edit_idea(token, id, state){
		var formData = new FormData();
		formData.append("contenido", state.contenido);
		formData.append("aprobado", state.aprobado);
		formData.append("usuario", state.usuario);
		formData.append("tablero", state.tablero);
		const query = await fetch(`/app/idea/${id}/`,
			{
				method: 'PUT',
				headers: new Headers({
					'Authorization': token,
				}),
				body: formData,
			});
		const data = await query.json();
		return {data: data, status: query.status};
	}

	async delete_idea(token, id){
		const query = await fetch(`/app/idea/${id}/`,
			{
				method: 'DELETE',
				headers: new Headers({
					'Authorization': token,
				}),
			});
		return {status: query.status};
	}

	async create_tablero(token, state){
		var formData = new FormData();
		formData.append("usuario", state.usuario);
		formData.append("estado", state.estado);
		formData.append("nombre", state.nombre);
		const query = await fetch(`/app/tablero/`,
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': token,
				}),
				body: formData,
			});
		const data = await query.json();
		return {data: data, status: query.status};
	}

	async create_idea(token, state){
		var formData = new FormData();
		formData.append("contenido", state.contenido);
		formData.append("usuario", state.usuario);
		formData.append("tablero", state.tablero);
		const query = await fetch(`/app/idea/`,
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': token,
				}),
				body: formData,
			});
		return {status: query.status};
	}
}

export default new Api();