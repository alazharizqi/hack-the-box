
<!DOCTYPE html>
<html lang="en">
<head>
<title>LaTeX Equation Generator</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<style>

body {
    min-height: 100vh;
    max-width: 700px;
    background-color: light-grey; 
    margin: 0 auto;
}
</style>
<body>
<div>
<h1>LaTeX Equation Generator</h1>
<p>Need to quickly generate a good looking equation for a website, like this?
<br><br>
<center><img src="example.png" /></center>
<br><br>
</p>
<p>Use this equation generator to create a .PNG file.</p>
<p>Please enter LaTeX inline math mode syntax in the text field (only oneliners supported at the moment). Clicking "Generate" will directly return a .PNG file that you can save with Ctrl+S (or Command+S if on Mac).</p>
<form action="equation.php" method="get">
  <div class="form-group row">
    <div class="col-8">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fa fa-code"></i>
          </div>
        </div>
        <input id="text" name="eqn" placeholder="Enter LaTeX code here" type="text" class="form-control" aria-describedby="textHelpBlock">
      </div>
    </div>
      <button name="submit" type="submit" class="btn btn-primary">Generate</button>
  </div>
</form>
<div>
<h2>Examples</h2>
<p>Here are a few code examples that contain the basic math commands to make LaTeX typeset beautiful equations:</p>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">LaTeX code</th>
      <th scope="col">Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Fractions</th>
      <td><samp>\frac{x+5}{y-3}</samp></td>
      <td><img src="demo/fraction.png" /></td>
    </tr>
    <tr>
      <th scope="row">Greek letters</th>
      <td><samp>\alpha \beta \gamma</samp></td>
      <td><img src="demo/greek.png" /></td>
    </tr>
    <tr>
      <th scope="row">Summations</th>
      <td><samp>\sum_{n=1}^\infty</samp></td>
      <td><img src="demo/summ.png" /></td>
    </tr>
    <tr>
      <th scope="row">Square root</th>
      <td><samp>\sqrt[n]{1+x}</samp></td>
      <td><img src="demo/sqrt.png" /></td>
    </tr>
  </tbody>
</table>
</div>
</body>
</html>

