import numpy as np

class DSELinearClassifier(object):
    """DSELinearClassifier  classifier.

    Parameters
    ------------
    activation: string
          values are ('Perceptron', 'Logistic', 'HyperTan').
    initial_weight: vector
        inital weight
    random_state : int
        Random number generator seed for random weight initialization.
    eta : float
        Learning rate (between 0.0 and 1.0)
    max_epochs : int
        Passes over the training dataset.


    Attributes
    -----------
    w_ : 1d-array
        Weights after fitting.
    cost_ : list
        Sum-of-squares cost function value in each epoch.

    """

    def __init__(self, activation, initial_weight, random_state=42, eta=0.01, max_epochs=50):
        self.eta = eta
        self.max_epochs = max_epochs
        self.random_state = random_state
        self._w = initial_weight
        self.activation = activation

    def fit(self, X, Y):
        """ Fit training data.

        Parameters
        ----------
        X : {array-like}, shape = [n_examples, n_features]
            Training vectors, where n_examples
            is the number of examples and
            n_features is the number of features.
        y : array-like, shape = [n_examples]
            Target values.

        Returns
        -------
        self : object

        """

        self.cost_ = []
        self._fit_errors = []

        for i in range(self.max_epochs):
            errors = 0
            for x, y in zip(X, Y):
                z = self.net_input(x)
                yhat = 0
                if self.activation == 'Perceptron':
                    yhat = self.activation_linear(z)
                elif self.activation == 'Logistic':
                    yhat = self.activation_sigmoid(z)
                elif self.activation == 'HyperTan':
                    yhat = self.activation_tanh(z)
                errors = (y - yhat)
                delta_w = self.eta * errors * x
                self._w = self._w + delta_w

            self._fit_errors.append(errors)

        return self

    def net_input(self, X):
        """Calculate net input"""
        return np.dot(X, self._w.T)

    def activation_linear(self, X):
        """Compute linear activation"""
        return X

    def activation_sigmoid(self, X):
        """logistic activation function"""
        return 1 / (1 + np.exp(-X))

    def activation_tanh(self, X):
        """Tanh activation function"""
        return (np.exp(X) - np.exp(-X)) / (np.exp(X) + np.exp(-X))

    def predict(self, X):
        if self.activation == 'Perceptron':
            return np.where(self.net_input(X) >= 0.0, 1, -1)
        elif self.activation == 'Logistic':
            return np.where(self.net_input(X) >= 0.0, 0, 1)
        elif self.activation == 'HyperTan':
            return np.where(self.net_input(X) >= 0.0, 1, -1)