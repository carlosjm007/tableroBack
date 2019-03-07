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
}

export default new Api();