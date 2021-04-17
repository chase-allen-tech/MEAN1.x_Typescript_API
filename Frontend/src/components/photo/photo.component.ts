export default {
  controller: class Photo {

    constructor($http: ng.IHttpService) {
      this._httpService = $http;
    }
    private _httpService: ng.IHttpService;
    private data: any;

    private yesButton = '<div color="red">Some very bad things have happened. I don\'t know what, but it seems like this is the end for us.</div>';

    check(): ng.IPromise<{}> {
      this._httpService.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      return this._httpService.get("http://localhost:8000/api/photo");
    }

    $onInit() {

      this.check().then((result: ng.IHttpPromiseCallbackArg<{}>) => {
        let res_data = result.data.data;
        this.data = [];
        res_data.forEach(item => {
          var m = new Date();
          var datetime = m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + "T" + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds() + "." + m.getUTCMilliseconds();
          this.data.push({
            userid: item.userid,
            product_code: item.code,
            product_name: item.name,
            product_time: item.time,
            updated_at: datetime
          })
        });
        console.log(this.data);
      });
    }

    save() {
      if(!confirm("Are you going to save the modified data?")) return;
      this._httpService.post("http://localhost:8000/api/photo", this.data).then(res => {
        alert("Successfully Sent");
      });
    }
  },
  template() {
    return `
      <h1>Photo Page</h1>

      <h3>User ID: {{ $ctrl.data[0].userid }}</h3>
      <div>
          <table class="table table-striped">
              <thead>
                  <th>No</th><th>Code</th><th>Name</th><th>Time</th><th>Updated At</th>
              </thead>
              <tbody>
                  <tr ng-repeat="item in $ctrl.data">
                      <td>{{ $index + 1 }}</td>
                      <td style="width: 10%"><input type="text" class="form-control" ng-model="item.product_code"></td>
                      <td><input type="text" class="form-control" ng-model="item.product_name"></td>
                      <td style="width: 10%"><input type="text" class="form-control w-20" ng-model="item.product_time"></td>
                      <td>{{item.updated_at}}</td>
                  </tr>
              </tbody>
          </table>
          
          <button ng-click="$ctrl.save()" class="btn btn-primary pull-right btn-save">Save</button>
      </div>
    `;
  }
}
